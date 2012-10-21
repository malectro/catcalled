class EntriesController < ApplicationController

  def show
    @participant = Participant.find_by_name(params[:participant_id])
    @entry = @participant.entries[params[:id].to_i]
    @entry_index = params[:id].to_i

    respond_to do |format|
      format.html
      format.json { render json: @entry }
    end
  end

end

