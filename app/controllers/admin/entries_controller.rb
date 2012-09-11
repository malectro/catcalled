class Admin::EntriesController < Admin::AdminController

  before_filter :fix_time_params, only: [:create, :update]
  before_filter :add_participant_list, only: [:index, :edit]

  def index
    limit = (params[:limit]) ? params[:limit].to_i : 10

    if participant
      @entries = participant.entries
      @name = participant.name
    else
      @entries = Entry.all
      @name = 'Everyone'
    end

    @entries = @entries[0..limit]
    @entry = Entry.new

    respond_to do |format|
      format.html
      format.json { render json: @entries }
    end
  end

  def show
    @entry = Entry.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @participant }
    end
  end

  def new
    @entry = Entry.new

    respond_to do |format|
      format.html
      format.json { render :json => @entry }
    end
  end

  def create
    @entry = Entry.new(params[:entry])

    respond_to do |format|
      if @entry.save
        format.html { redirect_to admin_participant_entries_path(@entry.participant) }
        format.json { render json: @entry, status: :created, location: @entry }
      else
        format.html { render action: 'new' }
        format.json { render json: @entry.errors, status: :failed }
      end
    end
  end

  def update
    @entry = Entry.find(params[:id])

    respond_to do |format|
      if @entry.update_attributes(params[:entry])
        format.html { redirect_to admin_participant_entries_path(@entry.participant), notice: 'Saved' }
        format.json { render json: @entry, status: :created, location: @entry }
      else
        format.html { render action: 'edit' }
        format.json { render json: @entry.errors, status: :failed }
      end
    end
  end

  def edit
    @entry = Entry.find(params[:id])
  end

private

  def add_participant_list
    @participants = Participant.selectible_list
  end

  def participant
    @participant ||= @entry.participant if @entry
    @participant ||= Participant.find(params[:participant_id]) if params[:participant_id]
  end

  def fix_time_params
    collect_date(:written_at)
    collect_date(:occured_at)
  end

  def collect_date(symbol)
    params[:entry][symbol] = DateTime.civil(
      params[:entry].delete("#{symbol}(1i)").to_i,
      params[:entry].delete("#{symbol}(2i)").to_i,
      params[:entry].delete("#{symbol}(3i)").to_i,
      params[:entry].delete("#{symbol}(4i)").to_i,
      params[:entry].delete("#{symbol}(5i)").to_i
    )
  end
end
