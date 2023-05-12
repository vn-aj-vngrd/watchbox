import { render, screen, fireEvent } from '@testing-library/react'
import ToggleTheme from "../../../../components/Common/ToggleTheme";

const mockUseTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}));

describe('ToggleTheme', () => {
  const setTheme = jest.fn()
  const systemTheme = 'system'
  const lightTheme = 'light'
  const darkTheme = 'dark'

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      systemTheme,
      theme: lightTheme,
      setTheme,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the sun icon for dark theme', () => {
    mockUseTheme.mockReturnValue({
      systemTheme,
      theme: darkTheme,
      setTheme,
    })

    const { getByTestId } = render(<ToggleTheme />)

    const sunIcon = getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument()
  })

  it('renders the moon icon for light theme', () => {
    mockUseTheme.mockReturnValue({
      systemTheme,
      theme: lightTheme,
      setTheme,
    })

    const { getByTestId } = render(<ToggleTheme />)

    const moonIcon = getByTestId('moon-icon');
    expect(moonIcon).toBeInTheDocument()
  })

  it('calls setTheme with "light" when button is clicked on dark theme', () => {
    mockUseTheme.mockReturnValue({
      systemTheme,
      theme: darkTheme,
      setTheme,
    })

    render(<ToggleTheme />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(setTheme).toHaveBeenCalledWith(lightTheme)
  })

  it('calls setTheme with "dark" when button is clicked on light theme', () => {
    mockUseTheme.mockReturnValue({
      systemTheme,
      theme: lightTheme,
      setTheme,
    })

    render(<ToggleTheme />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(setTheme).toHaveBeenCalledWith(darkTheme)
  })
})
