class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :participants

  def participants
    @participants ||= Participant.all.sort_by(&:number)
  end
end
