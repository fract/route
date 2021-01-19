/**
 * @jest-environment jsdom
 */

import { whatsUp } from 'whatsup'
import { redirect } from '@whatsup-js/browser-pathname'
import { route } from '../src/route'

describe('Route test with exact', () => {
    const mock = jest.fn()
    const errorMock = jest.fn()
    const rootRouteExact = route(
        '/root',
        function* () {
            while (true) {
                yield 'ROOT'
            }
        },
        true
    )
    whatsUp(rootRouteExact, mock, errorMock)

    it('should mock called with "ROOT"', () => {
        redirect('/root')
        expect(mock).lastCalledWith('ROOT')
    })

    it('should mock again called with null', () => {
        redirect('/root/foo')
        expect(mock).lastCalledWith(null)
    })
})

describe('Route test without exact', () => {
    const mock = jest.fn()
    const errorMock = jest.fn()
    const rootRouteNotExact = route(
        '/root',
        function* () {
            while (true) {
                yield 'ROOT'
            }
        },
        false
    )

    whatsUp(rootRouteNotExact, mock, errorMock)

    it('should mock called with "ROOT"', () => {
        redirect('/root')
        expect(mock).lastCalledWith('ROOT')
    })

    it('should mock called with "ROOT" when pathname is /root/foo', () => {
        redirect('/root/foo')
        expect(mock).lastCalledWith('ROOT')
    })
})
