import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from './Checkout';
import { UserContext } from '../context/User';
import { CartContext } from '../hooks/useCart';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from '@jest/globals';



// Mockear el hook useCart para proveer un carrito y un precio total
const mockUseCart = {
  cart: [{ productId: '1', quantity: 2 }],
  totalPrice: 50,
};

const mockUser = {
  _id: 'user123',
  email: 'user@example.com',
};

describe('Checkout Component', () => {
  it('should render the checkout form correctly', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: mockUser }}>
          <CartContext.Provider value={mockUseCart}>
            <Checkout />
          </CartContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Verificar que algunos elementos importantes estén en el documento
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese su nombre y apellido')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese su correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese su número de teléfono')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese su dirección de envío')).toBeInTheDocument();
    expect(screen.getByText('Confirmar Orden')).toBeInTheDocument();
  });

  it('should show error if cart is empty when trying to confirm the order', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: mockUser }}>
          <CartContext.Provider value={{ cart: [], totalPrice: 0 }}>
            <Checkout />
          </CartContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Confirmar Orden'));

    // Verifica que la alerta de SweetAlert aparece (puedes simular con Jest)
    expect(screen.getByText('El carrito está vacío o no está disponible.')).toBeInTheDocument();
  });
});
