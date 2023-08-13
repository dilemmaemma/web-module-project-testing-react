import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import { userEvent } from '@testing-library/user-event/dist/types/setup';

const testShow = {
    name: 'test show',
    summary: 'test summary',
    season: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        }
    ]
}

test('renders without errors', () => {
    render(<Show show={testShow} selectSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectSeason={'none'}/>);
    expect(screen.getByTestIdj('loading-container')).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectSeason={'none'} />)
    const seasonOptions = screen.queryAllByTestId('season-option')
    expect(seasonOptions.length).toEqual(testShow.season.length)
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn()
    render(<Show show={testShow} selectSeason={'none'} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/select a season/i)
    userEvent.selectOptions(select, ['1'])
    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={testShow} selectedSeason={'none'} />)
    let episodes = screen.queryByTestId('episodes-container')
    expect(episodes).not.toBeInTheDocument()
    rerender(<Show show={testShow} selectedSeason={1} />)
    expect(episodes).toBeInTheDocument()
});
