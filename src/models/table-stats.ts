import mongoose from 'mongoose';

//An interface that describes the properties that are required to create new Model
interface TableStatsAttrs {
  table_name: string;
  total_record: number;
}

//An interface that describes the properties that a TableStats Model has
interface TableStatsModel extends mongoose.Model<TableStatsDoc> {
  build(attrs: TableStatsAttrs): TableStatsDoc;
}

//An interface that describes the properties that a TableStats Document has
interface TableStatsDoc extends mongoose.Document {
  table_name: string;
  total_record: number;
}

const tableStatsSchema = new mongoose.Schema(
  {
    table_name: {
      type: String,
      required: true,
    },
    total_record: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

tableStatsSchema.statics.build = (attrs: TableStatsAttrs) => {
  return new TableStats(attrs);
};

const TableStats = mongoose.model<TableStatsDoc, TableStatsModel>('TableStats', tableStatsSchema);

export { TableStats };
