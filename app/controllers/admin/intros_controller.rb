class Admin::IntrosController < Admin::AdminController
  before_filter :get_stuff

  def update
    respond_to do |format|
      if @intro.update_attributes(params[:intro])
        format.html { redirect_to edit_admin_participant_intro_path(@participant), notice: 'Saved' }
        format.json { render json: @intro, status: :created, location: @intro }
      else
        format.html { render action: 'edit' }
        format.json { render json: @intro.errors, status: :failed }
      end
    end
  end

  def edit
  end

private

  def get_stuff
    @participant = Participant.find(params[:participant_id])
    @intro = @participant.intro
  end

end

