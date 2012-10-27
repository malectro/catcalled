class HomeController < ApplicationController
  def index
    @profiled = Participant.where(profiled: true).first || @participants.first
    @about = About.first
  end

  def about
    @about = About.first
  end
end
