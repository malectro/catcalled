class Admin::BiosController < Admin::AdminController
  before_filter :get_stuff

  def update
    respond_to do |format|
      if @bio.update_attributes(params[:bio])
        format.html { redirect_to edit_admin_participant_bio_path(@participant), notice: 'Saved' }
        format.json { render json: @bio, status: :created, location: @bio }
      else
        format.html { render action: 'edit' }
        format.json { render json: @bio.errors, status: :failed }
      end
    end
  end

  def edit
  end

private

  def get_stuff
    @participant = Participant.find(params[:participant_id])
    @bio = @participant.bio
  end

end
