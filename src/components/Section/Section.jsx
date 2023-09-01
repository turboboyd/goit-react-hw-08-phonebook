import css from './Section.module.css'

export default function Section(props) { return (<section className={css.section}>{props.children }</section>) }