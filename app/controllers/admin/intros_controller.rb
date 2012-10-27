class Admin::IntrosController < Admin::AdminController
  def update
    @intro = Intro.find(params[:id])

    respond_to do |format|
      if @intro.update_attributes(params[:intro])
        format.html { redirect_to edit_admin_participant_intro_path(@intro), notice: 'Saved' }
        format.json { render json: @intro, status: :created, location: @intro }
      else
        format.html { render action: 'edit' }
        format.json { render json: @intro.errors, status: :failed }
      end
    end
  end

  def edit
    @intro = Intro.find(params[:id])
    @participant = @intro.participant
  end
end

