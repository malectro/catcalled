class ApplicationController < ActionController::Base
  protect_from_forgery

  TUMBLR_API_KEY = 'wQukqjUKktkK38DLQ54E3z02dw0CfWxedtwzwr7yapodUpfGC3'

  before_filter :participants

  def participants
    @participants ||= Participant.all.sort_by(&:number)
  end
end
