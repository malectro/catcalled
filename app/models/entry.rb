class Entry
  include Mongoid::Document

  belongs_to :participant

  field :text, type: String
  field :written_at, type: DateTime, default: DateTime.now
  field :occured_at, type: DateTime, default: DateTime.now

  def text_html
    text.gsub("\n", "<br />")
  end

  def written_at_time
    Time.at(written_at)
  end
  def occured_at_time
    Time.at(occured_at)
  end
end

