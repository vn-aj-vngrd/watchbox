import { render, screen, fireEvent } from '@testing-library/react';
import Metadata from "../../../../components/Entry/Metadata";

describe('Metadata', () => {
    it('should render the metadata', () => {
        render(<Metadata
            entryId="test"
            movieId="test"
            review="test"
            note="test"
            rating={5}
            toggleReview={false}
            setToggleReview={jest.fn()}
            toggleNote={false}
            setToggleNote={jest.fn()}
            updateEntryComponent={jest.fn()}
        />);
        expect(screen.getByText('test')).toBeInTheDocument();
    });
});
