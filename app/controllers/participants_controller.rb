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
    @participant_index ||= participants.index(@participant)

    if @participant == @participants.last
      @next_participant ||= @participants.first
    else
      @next_participant ||= @participants[@participant_index + 1]
    end

    if @participant_index == 0
      @prev_participant ||= @participants.last
    else
      @prev_participant ||= @participants[@participant_index - 1]
    end
  end

end
