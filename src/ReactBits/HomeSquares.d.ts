declare module '../ReactBits/HomeSquares' {
  export interface SquaresProps {
    speed?: number;
    squareSize?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
    borderColor?: string;
    hoverFillColor?: string;
  }
  
  const Squares: React.FC<SquaresProps>;
  export default Squares;
}
