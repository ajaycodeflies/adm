import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
    {
        plan_name: { type: String, required: true },
        price: { type: Number, required: true },
        original_price: { type: Number, required: true },
        per_day_price: { type: Number },
        per_day_off: { type: Number },
        is_popular: { type: Boolean, default: false },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
