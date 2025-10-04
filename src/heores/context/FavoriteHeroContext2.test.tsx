import { use } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavoriteHeroContext, FavoriteHeroProvider } from './FavoriteHeroContext';
import type { Hero } from '../types/hero.interface';

const mockHero = {
  id: '1',
  name: 'batman',
} as Hero;

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>

      <div data-testid="favorite-list">
        {
          favorites.map(hero => (
            <div key={hero.id} data-testid={`hero-${hero.id}`}>
              {hero.name}
            </div>
          ))
        }
      </div>

      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>
  );
};

describe('FavoriteHeroContext', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should initialize with default values', () => {
    // console.log(localStorage);
    renderContextTest();

    screen.debug();

    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('favorite-list').children.length).toBe(0);
  });

  test('should add hero to favorites when toggleFavorite is called with new Hero', () => {
    renderContextTest();

    const button = screen.getByTestId('toggle-favorite');
    fireEvent.click(button);

    // screen.debug();

    // localStorage.clear();
    // console.log(localStorage.getItem('favorites'));
    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('hero-1').textContent).toBe('batman');

    expect(localStorageMock.setItem).toHaveBeenCalled();
    // eslint-disable-next-line quotes
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', "[{\"id\":\"1\",\"name\":\"batman\"}]");

    // expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]');
  });

  test('should remove hero from favorites when toggleFavorite is called', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

    // console.log(localStorage.getItem('favorites'));
    renderContextTest();

    // Realizando pruebas antes de pulsar el botón
    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('hero-1').textContent).toBe('batman');

    const button = screen.getByTestId('toggle-favorite');
    fireEvent.click(button);
    // screen.debug();

    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('is-favorite').textContent).toBe('false');
    expect(screen.queryByTestId('hero-1')).toBeNull();

    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
  });

});