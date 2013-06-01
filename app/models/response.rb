class Response
  include Mongoid::Document

  field :text, type: String
  field :email, type: String
  field :author, type: String
  field :written_at, type: DateTime, default: DateTime.now
  field :updated_at, type: DateTime, default: DateTime.now
  field :reviewed, type: Boolean, default: false

  #default_scope order_by(written_at: :asc)
  scope :reviewed, where(reviewed: true)
  scope :unreviewed, where(reviewed: false)

  class << self
    def reviewed
      where(reviewed: true).limit(20)
    end
  end

  def text_html
    text.gsub("\n", "<br />")
  end

  def written_at_time
    Time.at(written_at)
  end
end

