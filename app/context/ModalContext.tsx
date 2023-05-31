'use client'
import { createContext, useCallback, useContext, useState } from 'react'
import { NoOperation } from '../../utils'
import { ModalProps } from '../views/modal/Modal'

export interface OpenableProps<T> extends ModalProps {
  resolve: (param: T) => void
  reject?: (error: any) => void
  props: any
}

export type ModalComponent<T> = (props: OpenableProps<T>) => JSX.Element

interface ModalContextParams {
  openModal: <T>(MC: ModalComponent<T>, props?: any) => Promise<T>
  closeModal: () => void
}

const ModalContext = createContext<ModalContextParams>({
  // @ts-ignore
  openModal: (MC: ModalComponent<number>, props?: any) => Promise.resolve(1),
  closeModal: NoOperation,
})

interface ModalData<T> {
  id: number
  resolve: (value: T) => void
  reject: (error?: any) => void
  component: ModalComponent<T>
  props: any
}

let modalId = 0

export default function ModalContextProvider(props: { children?: any }) {
  const [modals, setModals] = useState<ModalData<any>[]>([])
  //@ts-ignore
  const openModal: ModalContextParams['openModal'] = useCallback((MC, props: any) => {
    return new Promise(function (resolve, reject) {
      setModals((prev) => {
        const id = modalId++
        return [
          ...prev,
          {
            id,
            reject: (value: any) => {
              reject(value)
              setModals((prev) => prev.filter((x) => x.id !== id))
            },
            props: props || {},
            resolve: (value: any) => {
              resolve(value)
              setModals((prev) => prev.filter((x) => x.id !== id))
            },
            component: MC,
          },
        ]
      })
    })
  }, [])
  const closeModal = useCallback(() => {
    setModals(() => [])
  }, [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {props.children}
      {modals.map(({ component: Component, id, reject, resolve, props }) => (
        <Component
          key={id}
          resolve={resolve}
          reject={reject}
          open={true}
          onClose={() => {
            resolve(false)
            // setModals(modals.filter((x) => x.id !== id))
          }}
          {...props}
        />
      ))}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
