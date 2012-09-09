class Admin::BiosController < ApplicationController
  def update
    @bio = Bio.find(params[:id])

    respond_to do |format|
      if @bio.update_attributes(params[:bio])
        format.html { redirect_to edit_admin_participant_bio_path(@bio), notice: 'Saved' }
        format.json { render json: @bio, status: :created, location: @bio }
      else
        format.html { render action: 'edit' }
        format.json { render json: @bio.errors, status: :failed }
      end
    end
  end

  def edit
    @bio = Bio.find(params[:id])
    @participant = @bio.participant
  end

end
