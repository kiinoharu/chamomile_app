# app/controllers/api/v1/records_controller.rb
class Api::V1::RecordsController < ApplicationController
  before_action :set_record, only: [:show]

  # GET /api/v1/records
  def index
    @records = Record.all
    render json: @records
  end

  # GET /api/v1/records/:id
  def show
    render json: @record
  end

  # POST /api/v1/records
  def create
    @record = Record.new(record_params)
    if @record.save
      render json: @record, status: :created
    else
      render json: @record.errors, status: :unprocessable_entity
    end
  end

  private

  def set_record
    @record = Record.find(params[:id])
  end

  def record_params
    params.require(:record).permit(:attribute1, :attribute2) # 適切な属性を指定してください
  end
end
