class Admin::AdminController < ApplicationController
  USERS = { "theadmin" => "welcometonewyork" }

  before_filter :authenticate

private

  def authenticate
    authenticate_or_request_with_http_digest do |username|
      USERS[username]
    end
  end
end
