# frozen_string_literal: true

require "action_cable/testing/rails_six"
using ActionCable::Testing::Rails6

module ActionCable
  # Provides helper methods for testing Action Cable broadcasting
  module TestHelper
    CHANNEL_NOT_FOUND = ArgumentError.new("Broadcasting channel can't be infered. Please, specify it with `:channel`")

    def before_setup # :nodoc:
      server = ActionCable.server
      test_adapter = ActionCable::SubscriptionAdapter::Test.new(server)

      @old_pubsub_adapter = server.pubsub

      server.instance_variable_set(:@pubsub, test_adapter)
      super
    end

    def after_teardown # :nodoc:
      super
      ActionCable.server.instance_variable_set(:@pubsub, @old_pubsub_adapter)
    end

    # Asserts that the number of broadcasted messages to the channel matches the given number.
    #
    #   def test_broadcasts
    #     assert_broadcasts 'messages', 0
    #     ActionCable.server.broadcast 'messages', { text: 'hello' }
    #     assert_broadcasts 'messages', 1
    #     ActionCable.server.broadcast 'messages', { text: 'world' }
    #     assert_broadcasts 'messages', 2
    #   end
    #
    # If a block is passed, that block should cause the specified number of
    # messages to be broadcasted.
    #
    #   def test_broadcasts_again
    #     assert_broadcasts('messages', 1) do
    #       ActionCable.server.broadcast 'messages', { text: 'hello' }
    #     end
    #
    #     assert_broadcasts('messages', 2) do
    #       ActionCable.server.broadcast 'messages', { text: 'hi' }
    #       ActionCable.server.broadcast 'messages', { text: 'how are you?' }
    #     end
    #   end
    #
    def assert_broadcasts(target, number, channel: nil)
      warn_deprecated_channel! unless channel.nil?

      stream = stream(target, channel)

      if block_given?
        original_count = broadcasts_size(stream)
        yield
        new_count = broadcasts_size(stream)
        assert_equal number, new_count - original_count, "#{number} broadcasts to #{stream} expected, but #{new_count - original_count} were sent"
      else
        actual_count = broadcasts_size(stream)
        assert_equal number, actual_count, "#{number} broadcasts to #{stream} expected, but #{actual_count} were sent"
      end
    end

    # Asserts that no messages have been sent to the channel.
    #
    #   def test_no_broadcasts
    #     assert_no_broadcasts 'messages'
    #     ActionCable.server.broadcast 'messages', { text: 'hi' }
    #     assert_broadcasts 'messages', 1
    #   end
    #
    # If a block is passed, that block should not cause any message to be sent.
    #
    #   def test_broadcasts_again
    #     assert_no_broadcasts 'messages' do
    #       # No job messages should be sent from this block
    #     end
    #   end
    #
    # Note: This assertion is simply a shortcut for:
    #
    #   assert_broadcasts 'messages', 0, &block
    #
    def assert_no_broadcasts(target, &block)
      assert_broadcasts target, 0, &block
    end

    # Asserts that the specified message has been sent to the channel.
    #
    #   def test_assert_transmited_message
    #     ActionCable.server.broadcast 'messages', text: 'hello'
    #     assert_broadcast_on('messages', text: 'hello')
    #   end
    #
    # If a block is passed, that block should cause a message with the specified data to be sent.
    #
    #   def test_assert_broadcast_on_again
    #     assert_broadcast_on('messages', text: 'hello') do
    #       ActionCable.server.broadcast 'messages', text: 'hello'
    #     end
    #   end
    #
    def assert_broadcast_on(target, data, channel: nil)
      warn_deprecated_channel! unless channel.nil?

      # Encode to JSON and back???we want to use this value to compare
      # with decoded JSON.
      # Comparing JSON strings doesn't work due to the order if the keys.
      serialized_msg =
        ActiveSupport::JSON.decode(ActiveSupport::JSON.encode(data))
      stream = stream(target, channel)

      new_messages = broadcasts(stream)
      if block_given?
        old_messages = new_messages
        clear_messages(stream)

        yield
        new_messages = broadcasts(stream)
        clear_messages(stream)

        # Restore all sent messages
        (old_messages + new_messages).each { |m| pubsub_adapter.broadcast(stream, m) }
      end

      message = new_messages.find { |msg| ActiveSupport::JSON.decode(msg) == serialized_msg }

      assert message, "No messages sent with #{data} to #{stream}"
    end

    def pubsub_adapter # :nodoc:
      ActionCable.server.pubsub
    end

    delegate :broadcasts, :clear_messages, to: :pubsub_adapter

    private
      def broadcasts_size(channel) # :nodoc:
        broadcasts(channel).size
      end

      def stream(target, channel = nil)
        return target if target.is_a?(String)

        channel ||= @subscription
        return target unless channel && channel.respond_to?(:channel_name)

        channel.broadcasting_for(target)
      end

      def warn_deprecated_channel!
        ActiveSupport::Deprecation.warn(
          "Passing channel class is deprecated and will be removed in version 1.0. " \
          "Use `Channel.broadcasting_for(object) to build a stream name instead and " \
          "add `using ActionCable::Testing::Rails6` to your test file."
        )
      end
  end
end
