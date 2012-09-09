class HomeController < ApplicationController
  def index
    @participants = Participant.all
  end
end
