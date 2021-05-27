import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IProduct } from '../models/product';
import NavBar from '../../features/nav/NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';

const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedProduct(null);
    setEditMode(true);
  }

  const handleCreateProduct = (product: IProduct) => {
    setProducts([...products, product]);
    setSelectedProduct(product);
    setEditMode(false);
  }

  const handleEditProduct = (product: IProduct) => {
    setProducts([...products.filter(a => a.id !== product.id), product])
    setSelectedProduct(product);
    setEditMode(false);
  }

  const handleDeleteProduct = (id: string) => {
    setProducts([...products.filter(a => a.id !== id)])
  }

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<IProduct[]>('http://localhost:5000/api/products')
      .then(response => {
        let products: IProduct[] = [];
        response.data.forEach(product => {
          product.date = product.date.split('.')[0]
          products.push(product);
        })
        setProducts(products);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ProductDashboard
          products={products}
          selectProduct={handleSelectProduct}
          selectedProduct={selectedProduct}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
          createProduct={handleCreateProduct}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
        />
      </Container>
    </Fragment>
  );
};

export default App;
