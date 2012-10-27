class ParticipantsController < ApplicationController

  before_filter :participant

  def show
    respond_to do |format|
      format.html
      format.json { render json: @participant }
    end
  end

  def intro

  end

  def exit

  end

private

  def participant
    @participant ||= Participant.find_by_name(params[:id])
  end

end
