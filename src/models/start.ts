import mongoose from 'mongoose';

//An interface that describes the properties that are required to create new Model
interface StartAttrs {
  title: string;
  price: number;
}

//An interface that describes the properties that a Start Model has
interface StartModel extends mongoose.Model<StartDoc> {
  build(attrs: StartAttrs): StartDoc;
}

//An interface that describes the properties that a Start Document has
interface StartDoc extends mongoose.Document {
  title: string;
  price: number;
}

const startSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
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

startSchema.statics.build = (attrs: StartAttrs) => {
  return new Start(attrs);
};

const Start = mongoose.model<StartDoc, StartModel>('Start', startSchema);

export { Start };
