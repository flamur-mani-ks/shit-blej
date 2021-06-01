import { IAttendee } from '../../models/product';
import { IUser } from '../../models/user';

export const combineDateAndTime = (date: Date, time: Date) => {
	const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dateString = `${year}-${month}-${day}`;

	return new Date(dateString + ' ' + timeString);
};

// export const setProductProps = (product: IProduct, user: IUser) => {
// 	product.date = new Date(product.date);
// 	product.isOwner = product.attendees.some(
// 		a => a.username === user.username && a.isOwner
// 	);
//   return product;
// };

export const createAttendee = (user: IUser): IAttendee => {
  return {
      displayName: user.displayName,
      isOwner: true,
      username: user.username,
      image: user.image!,
      phoneNumber: user.phoneNumber!,
      city: user.city!
  }
}