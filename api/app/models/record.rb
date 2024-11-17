class Record < ApplicationRecord
  belongs_to :user

  validates :record_date, presence: true, uniqueness: { scope: :user_id, message: "は既に存在します" }
  validates :temperature, numericality: { greater_than_or_equal_to: 35.0, less_than_or_equal_to: 42.0 }, allow_nil: true
  validates :weight, numericality: { greater_than_or_equal_to: 0.0, less_than_or_equal_to: 300.0 }, allow_nil: true
  validates :note, length: { maximum: 500 }, allow_blank: true
  validate  :period_start_and_end_cannot_be_true

  before_save :format_record_date

  private

  def period_start_and_end_cannot_be_true
    if is_period_start && is_period_end
      errors.add(:base, "生理の開始と終了は同時に選択できません")
    end
  end

  def format_record_date
    self.record_date = record_date.to_date.strftime('%Y-%m-%d') if record_date.present?
  end
end
