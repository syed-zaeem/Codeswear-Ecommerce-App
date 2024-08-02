import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  let orders = await Order.find();

  let todayDate = new Date();
  console.log("Today's Date: ", todayDate.toDateString());

  let previousDates = [];
  let previousDays = [];

  for (let i = 0; i <= 6; i++) {
    let previousDate = new Date(todayDate);
    previousDate.setDate(todayDate.getDate() - i);
    previousDates.push(previousDate.toDateString());
    previousDays.push(previousDate.toDateString().slice(0, 3));
  }

  previousDates = previousDates.reverse();
  previousDays = previousDays.reverse();

  console.log("Previous 7 days' dates: ", previousDates);
  console.log("Previous 7 days are: ", previousDays);

  //   orders.map((order)=>{
  //     console.log("The order is of: " , order.createdAt.toDateString())
  //   })

  let weeklyOrders = [];

  previousDates.map((previousDate) => {
    weeklyOrders.push({
      [previousDate.slice(0, 3)]: orders.filter((o) => {
        return o.createdAt.toDateString() === previousDate;
      }),
    });
  });

  //   console.log(weeklyOrders[5]["Mon"])

  let count = 0
  let weeklySales = []

  previousDays.map((pd)=>{
    // console.log(weeklyOrders[count][pd])
    let totalQuantity = 0
    let temporaryOrder = weeklyOrders[count][pd]
    console.log("temporaryOrder is : " , temporaryOrder.length)
    if(temporaryOrder.length === 0){
        weeklySales.push(0)
    }
    else{
        temporaryOrder.map((torder)=>{
            Object.keys(torder.products).map((k)=>{
                // console.log(order.amount , order.products[k].qty)
                totalQuantity += torder.products[k].qty
            })
        })
        weeklySales.push(totalQuantity)
    }
    count += 1
  })

  //   previousDates.map((previousDate) => {
  //     weeklyOrders.push(
  //       orders.map((o) => {
  //         if (o.createdAt.toDateString() === previousDate) {
  //           return o;
  //         }
  //       }),
  //     );
  //   });

  //   weeklyOrders.map((weeklyOrder)=>{
  //     console.log(weeklyOrder)
  //     weeklyOrder.filter((wo)=>{
  //         return wo !== undefined
  //     })
  //   })

  res.status(200).json({previousDays, weeklySales});
  //   res.status(200).json({ orders });
};

export default connectDb(handler);
