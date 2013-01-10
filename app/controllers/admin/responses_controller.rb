class Admin::ResponsesController < Admin::AdminController

  def index
    @page = (params[:page]) ? params[:page].to_i : 0
    @limit = 20
    @total = Response.count
    @responses = Response.all.order_by(reviewed: :asc).limit(@limit).offset(@limit * @page)
  end

  def edit
    @response = Response.find(params[:id])
  end

  def update
    @response = Response.find(params[:id])

    respond_to do |format|
      if @response.update_attributes(params[:response])
        format.html { redirect_to edit_admin_response_path(@response), notice: 'Saved' }
        format.json { render json: @response, status: :created, location: @response }
      else
        format.html { render action: 'edit' }
        format.json { render json: @response.errors, status: :failed }
      end
    end
  end


end

