import getUserModel from './User';
import getUserAccountModel from './UserAccount';
import getBookModel from './Book';
import getOrderModel from './Order';
import getOrderDetailModel from './OrderDetail';
import getAuthorModel from './Author';
import getBookAuthorModel from './BookAuthor';
import getGenreModel from './Genre';
import getBookGenreModel from './BookGenre';
import getVendorModel from './Vendor';
import getVendorOrderModel from './VendorOrder';
import getNotificationModel from './Notification';
import getAuditLogModel from './AuditLog';

export default {
  User: getUserModel,
  UserAccount: getUserAccountModel,
  Book: getBookModel,
  Order: getOrderModel,
  OrderDetail: getOrderDetailModel,
  Author: getAuthorModel,
  BookAuthor: getBookAuthorModel,
  Genre: getGenreModel,
  BookGenre: getBookGenreModel,
  Vendor: getVendorModel,
  VendorOrder: getVendorOrderModel,
  Notification: getNotificationModel,
  AuditLog: getAuditLogModel,
};