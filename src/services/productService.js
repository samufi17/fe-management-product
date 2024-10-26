export class ProductService {
  constructor(id, name, price, description, status) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.status = status;  // Pending, Approved, Rejected
  }
}
