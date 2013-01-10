class Admin::ParticipantsController < Admin::AdminController

  def index
    @participants = Participant.all
    @new_response_count = Response.unreviewed.count
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
    @participant = Participant.new(params[:participant])
    @participant.bio = Bio.new
    @participant.intro = Intro.new
    @participant.exit_interview = ExitInterview.new

    respond_to do |format|
      if @participant.save && @participant.bio.save && @participant.intro.save && @participant.exit_interview.save
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

  def profile
    @participant = Participant.find(params[:id])
    profiled = Participant.where(profiled: true).first
    profiled.update_attribute :profiled, false if profiled
    @participant.update_attribute :profiled, true

    redirect_to admin_participants_path
  end

end
