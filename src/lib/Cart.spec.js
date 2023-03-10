import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas running shoes - men',
    price: 35388, // 353.88 | 383,88
  }

  let product2 = {
    title: 'Adidas running shoes - women',
    price: 41872, // 353.88 | 383,88
  }

  beforeEach(() => {
    cart = new Cart();
  });
  
  describe('getTotal()', () => {
    it('Should return 0 when getTotal() is executed in a newly created function', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  
    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2, // 70776
      };
  
      cart.add(item);
  
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
  
    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2, 
      });
  
      cart.add({
        product,
        quantity: 1, 
      });
  
      expect(cart.getTotal().getAmount()).toEqual(35388);
    })
  
    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2, 
      });
  
      cart.add({
        product:  product2,
        quantity: 1, 
      });
  
      cart.remove(product)
  
      expect(cart.getTotal().getAmount()).toEqual(41872)
    })
  })
  
  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2, 
      });
  
      cart.add({
        product:  product2,
        quantity: 3, 
      });
       //escreve o snapshot abaixo
      expect(cart.checkout()).toMatchInlineSnapshot(`
{
  "items": [
    {
      "product": {
        "price": 35388,
        "title": "Adidas running shoes - men",
      },
      "quantity": 2,
    },
    {
      "product": {
        "price": 41872,
        "title": "Adidas running shoes - women",
      },
      "quantity": 3,
    },
  ],
  "total": 196392,
}
`);
    //escreve o snapshot na pasta snapshots, assim o teste fica mais "limpo"
    expect(cart.checkout()).toMatchSnapshot()

    })
    
    it('should return an object with the total and the list of items when sumary() is called', () => {
      cart.add({
        product,
        quantity: 2, 
      });
  
      cart.add({
        product:  product2,
        quantity: 3, 
      });

    //escreve o snapshot na pasta snapshots, assim o teste fica mais "limpo"
    expect(cart.sumary()).toMatchSnapshot()
    expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })
    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3
      })

      cart.checkout()

      expect(cart.getTotal().getAmount()).toEqual(0)
    })
  })

  describe('special conditions', () => {
    it('should apply percentage discount when certain quantity above minimun is passed', () => {
      const condition = {
        percentage: 30,
        minimun: 2
      }

      cart.add({
        product,
        condition,
        quantity: 3
      })

      expect(cart.getTotal().getAmount()).toEqual(74315)
    })

    it('should NOT apply percentage discount when certain quantity is below or equals minimun', () => {
      const condition = {
        percentage: 30,
        minimun: 2
      }

      cart.add({
        product,
        condition,
        quantity: 2
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2
      }

      cart.add({
        product,
        condition,
        quantity: 4
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should NOT apply quantity discount for even quantities when condition is not met', () => {
      const condition = {
        quantity: 2
      }

      cart.add({
        product,
        condition,
        quantity: 1
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2
      }

      cart.add({
        product,
        condition,
        quantity: 5
      })

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })
  })
});
