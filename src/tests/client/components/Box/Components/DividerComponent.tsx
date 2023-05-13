import { render, screen, fireEvent } from '@testing-library/react';
import DividerComponent from '../../../../../components/Box/Components/DividerComponent';

describe('DividerComponent', () => {
  test('renders DividerComponent with proper props', () => {
    const dividerComponent = {
      id: '1',
      text: 'Some text',
      entry: null,
      divider: {
        componentId: '1',
        orientation: 'horizontal',
        height: 100,
        width: 2,
        id: '2',
        created_at: '',
        updated_at: '',
      },
    };
    const removeStateComponent = jest.fn();
    const updateStateComponent = jest.fn();
    const canvasRef = { current: document.createElement('div') };
    const canvasSizeRef = { current: document.createElement('div') };
    const temp: string[] = [];
    const shift = false;
    const setDisablePan = jest.fn();
    const setShift = jest.fn();
    const setTemp = jest.fn();

    render(
      <DividerComponent
        dividerComponent={dividerComponent}
        removeStateComponent={removeStateComponent}
        updateStateComponent={updateStateComponent}
        canvasRef={canvasRef}
        canvasSizeRef={canvasSizeRef}
        temp={temp}
        shift={shift}
        setDisablePan={setDisablePan}
        setShift={setShift}
        setTemp={setTemp}
      />
    );

    // Expect divider text to be rendered
    const dividerText = screen.getByText('Some text');
    expect(dividerText).toBeInTheDocument();

    // Expect component to be resizable
    const resizableComponent = screen.getByRole('button', { name: 'Resize bottom-right handle' });
    fireEvent.mouseDown(resizableComponent);
    expect(setDisablePan).toHaveBeenCalledWith(true);
    fireEvent.mouseUp(resizableComponent);
    expect(setDisablePan).toHaveBeenCalledWith(false);

    // Expect component to be draggable
    const draggableComponent = screen.getByRole('button', { name: 'Draggable area' });
    fireEvent.mouseDown(draggableComponent);
    fireEvent.mouseMove(draggableComponent, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(draggableComponent);
    expect(updateStateComponent).toHaveBeenCalledWith(
      expect.objectContaining({ xAxis: expect.any(Number), yAxis: expect.any(Number) })
    );
  });
});