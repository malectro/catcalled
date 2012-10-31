class Admin::ExitInterviewsController < Admin::AdminController
  before_filter :get_stuff

  def update
    respond_to do |format|
      if @exit_interview.update_attributes(params[:exit_interview])
        format.html { redirect_to edit_admin_participant_exit_interview_path(@participant), notice: 'Saved' }
        format.json { render json: @exit_interview, status: :created, location: @exit_interview }
      else
        format.html { render action: 'edit' }
        format.json { render json: @exit_interview.errors, status: :failed }
      end
    end
  end

  def edit
  end

private

  def get_stuff
    @participant = Participant.find(params[:participant_id])
    @exit_interview = @participant.exit_interview
  end
end

