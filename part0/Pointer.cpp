#include<iostream>
struct Product {
    std::string name;  // name of the product
    char type;  // type of the product: 'M' for sold by meter, 'Q' for sold by quantity, 'V' for sold by volume
    double price;  // price per unit of the product
    double stock;  // current stock of the product
};
std::vector<Product> products;
void addProduct() {
    Product p;
    std::cout << "Enter name of product: ";
    std::cin >> p.name;
    std::cout << "Enter type of product ('M' for sold by meter, 'Q' for sold by quantity, 'V' for sold by volume): ";
    std::cin >> p.type;
    std::cout << "Enter price per unit: ";
    std::cin >> p.price;
    std::cout << "Enter current stock: ";
    std::cin >> p.stock;
    products.push_back(p);
}
int main() {
#ifndef ONLINE_JUDGE
    freopen("input.txt",“r”, stdin);
    freopen("output.txt",“w”, stdout);
#endif
    char choice;
    do {
        std::cout << "Enter 'A' to add a new product or 'Q' to quit: ";
        std::cin >> choice;
        if (choice == 'A') {
            addProduct();
        }
    } while (choice != 'Q');
    return 0;
}
