class Admin::AboutsController < Admin::AdminController
  def edit
    @about = About.first
    @about = About.create unless @about
  end

  def update
    @about = About.first

    respond_to do |format|
      if @about.update_attributes(params[:about])
        format.html { redirect_to edit_admin_about_path(@about), notice: 'Saved' }
        format.json { render json: @about, status: :created, location: @about }
      else
        format.html { render action: 'edit' }
        format.json { render json: @about.errors, status: :failed }
      end
    end
  end
end

