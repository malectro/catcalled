class EntriesController < ApplicationController

  def show
    @entry_index = params[:id].to_i
    @participant = Participant.find_by_name(params[:participant_id])
    @entry = @participant.entries[@entry_index]

    respond_to do |format|
      format.html
      format.json { render json: @entry }
    end
  end

end

