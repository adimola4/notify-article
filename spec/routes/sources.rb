require "rails_helper"

describe "get sources", type: :request do
  let!(:sources) { FactoryBot.create_list(:sources, 5) }

  before { get "/api/v1/sources" }

  it "returns all sources" do
    expect(JSON.parse(response.body).size).to eq(5)
  end
  it "returns status code 200" do
    expect(response.body.articles).to eq(10)
  end
  it "returns status code 200" do
    expect(response).to have_http_status(:success)
  end
end
