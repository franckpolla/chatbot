import Home from "@/app/page";
import { describe, it } from "node:test";

import { render, fireEvent, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
describe('Home component', () => {
    // Your existing test code goes here
  
    it('should capture and display user input in chatlog as "user" type', () => {
      const { getByPlaceholderText, getByText, getByRole } = render(<Home />);
      const inputElement = getByPlaceholderText('Enter your request');
      const sendButton = getByRole('button', { name: /send/i });
  
      fireEvent.change(inputElement, { target: { value: 'Hello, world!' } });
      fireEvent.click(sendButton);
  
      expect(screen.getByText('You: Hello, world!')).toBeInTheDocument();
    });
  });
  