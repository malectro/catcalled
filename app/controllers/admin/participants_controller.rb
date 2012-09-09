class Admin::ParticipantsController < ApplicationController

  def index
    @participants = Participant.all
  end

  def show
    @participant = Participant.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @participant }
    end
  end

  def new
    @participant = Participant.new

    respond_to do |format|
      format.html
      format.json { render :json => @participant }
    end
  end

  def create
    puts params
    @participant = Participant.new(params[:participant])
    @participant.bio = Bio.new

    respond_to do |format|
      if @participant.save
        format.html { redirect_to action: :index }
        format.json { render json: @participant, status: :created, location: @participant }
      else
        format.html { render action: 'new' }
        format.json { render json: @participant.errors, status: :failed }
      end
    end
  end

  def update
    @participant = Participant.find(params[:id])

    respond_to do |format|
      if @participant.update_attributes(params[:participant])
        format.html { redirect_to edit_admin_participant_path(@participant), notice: 'Saved' }
        format.json { render json: @participant, status: :created, location: @participant }
      else
        format.html { render action: 'edit' }
        format.json { render json: @participant.errors, status: :failed }
      end
    end
  end

  def edit
    @participant = Participant.find(params[:id])
  end

end
