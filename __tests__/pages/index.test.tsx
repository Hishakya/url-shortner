import React from "react";
const { TextEncoder } = require('text-encoding');
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";

describe('Home', () => {
    it('should render properly', () => {
        render(<Home />);
        screen.getByRole("heading", {
            name: "WELCOME TO OUR"
            // name: /Weather App/i
        });
    });
    
    
});