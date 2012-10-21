class ParticipantsController < ApplicationController

  def show
    @participant = Participant.find_by_name(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @participant }
    end
  end

end
