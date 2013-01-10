class Admin::ResponsesController < Admin::AdminController

  def index
    @responses = Response.all.order_by(reviewed: :desc)
  end

  def edit
    @response = Response.find(params[:id])
  end

end

