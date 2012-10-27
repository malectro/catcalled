class Admin::ExitInterviewsController < Admin::AdminController
  def update
    @exit_interview = ExitInterview.find(params[:id])

    respond_to do |format|
      if @exit_interview.update_attributes(params[:exit_interview])
        format.html { redirect_to edit_admin_participant_exit_interview_path(@exit_interview), notice: 'Saved' }
        format.json { render json: @exit_interview, status: :created, location: @exit_interview }
      else
        format.html { render action: 'edit' }
        format.json { render json: @exit_interview.errors, status: :failed }
      end
    end
  end

  def edit
    @exit_interview = ExitInterview.find(params[:id])
    @participant = @exit_interview.participant
  end
end

