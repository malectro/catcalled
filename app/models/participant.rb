class Participant
  include Mongoid::Document

  STATS = {age: "Age", race: "Race", hood: "Neighborhood", sex: "Sexuality"}

  field :fname, as: :first_name, type: String
  field :lname, as: :last_name, type: String
  field :name, type: String
  field :age, type: Integer
  field :race, type: String
  field :hood, type: String
  field :sex, type: String

  field :active, type: Boolean
  field :profiled, type: Boolean, default: false

  has_one :bio
  has_one :exit_interview
  has_one :intro
  has_many :entries

  class << self
    def selectible_list
      Participant.all.map(&:selectible)
    end

    def find_by_name(name)
      where(name: name).first
    end
  end

  def selectible
    [name, id]
  end

  def number
    name.to_i
  end
end
