require "rails_helper"

RSpec.describe Article, type: :model do
  describe "create" do
    it "can be created" do
      article = Article.create(FactoryBot.create(:article))

      expect(user).to be_valid
    end
  end
end
