class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true,  uniqueness: true
  validates :encrypted_password, presence: true

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def will_save_change_to_email?
    false
  end

  def self.check_cycle_discrepancy
    User.includes(:records).where.not(cycle: nil).select do |user|
      # 生理開始日を取得
      last_period_start = user.records.where(is_period_start: true).order(record_date: :desc).first&.record_date
      # 生理終了日を取得
      last_period_end = user.records.where(is_period_end: true).order(record_date: :desc).first&.record_date

      if last_period_start && last_period_end
        # 生理期間の日数を計算
        actual_cycle_length = (last_period_end - last_period_start).to_i

        # 実際の周期と設定した周期との差異を計算
        discrepancy = (actual_cycle_length - user.cycle).abs

        # ずれが3日以上の場合は対象とする
        discrepancy > 3
      else
        # 生理開始または終了データがない場合は対象外
        false
      end
    end
  end  
  
  has_many :records
end
