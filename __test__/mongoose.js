const clothes = await db.Clothes.model.find({
  $or: [
    { name: { $regex: args.keyword, $options: "i" } },
    { type: { $regex: args.keyword, $options: "i" } },
  ],
  _id: { $in: userClothesIds },
});

const clothes2 = await db.Clothes.model.find({
  _id: { $in: userClothesIds },
  $text: { $search: args.keyword },
});
