FactoryBot.define do
  factory :sources, class: Source do
    title { Faker::Lorem.sentence }
    website_url { Faker::Internet.email(domain: "example") }
    description { Faker::Lorem.sentence }
    image_url { Faker::Internet.email(domain: "example") }
    created_at { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    updated_at { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    articles { FactoryBot.create_list(article, 10) }
  end
  factory :article, class: Article do
    title { Faker::Lorem.sentence }
    original_url { Faker::Internet.email(domain: "example") }
    description { Faker::Lorem.sentence }
    image_url { Faker::Internet.email(domain: "example") }
    created_at { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    updated_at { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    source_id { Faker::Number.within(range: 2..48) }
    published_date { Faker::Time.between(from: DateTime.now - 5, to: DateTime.now) }
  end
end
